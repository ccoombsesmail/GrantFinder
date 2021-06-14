const express = require("express")
const router = express.Router()
const Grant = require('../../models/Grant');
const passport = require('passport');
require('../../config/passport')(passport)
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);
const moment = require('moment')

const fetch = require("node-fetch");
const textToJson = require('../../txtToJson')

const fetcher = (txtFile) => {
  return fetch(`http://localhost:5000/${txtFile}`).then(response => response.text())
}




router.get('/seed', (req, res) => {
  Grant.collection.drop().then(() => {
    Promise.all(
      [
        fetcher('grantNames.txt'),
        fetcher('description.txt'),
        fetcher('links.txt'),
        fetcher('amount.txt'),
        fetcher('deadline.txt'),
        fetcher('disbursment.txt'),
        fetcher('location.txt'),
        fetcher('applicant.txt'),
        fetcher('project.txt')]
    ).then(data => {
      const grantData = textToJson.textToJsonHelper(data)
      for (let i = 0; i < grantData.length; i++) {
        grantData[i].save()
      }
    })
  })
})

router.post('/upload', (req, res) => {
  const { grants } = req.body
  mongoose.connection.collections['grants'].drop((err) => {
    if (err) {
      console.log(err)
    }
    for (const g of grants) {
      g.tags = textToJson.formatTags(g.tags)
      let grant = new Grant(g)
      grant.save()
    }
  })
  res.send({success: 'true'}).status(200)
})


router.get('/', (req, res) => { 
  Grant.find()
    .then((grants) => {
      res.json(grants)
    })
})

router.post('/', (req, res) => { 
  const sortCat = req.body.filters[2][0]
  const sortOrder = Number(req.body.filters[2][1])
  const tagsConditions = req.body.filters[1].map((tag) => {
    return { 
      'tags.tag': tag
    }
  })
  let query
  if (req.body.filters[1].length === 0) {
    query = generateQuery(true, tagsConditions, req)
  } else {
    query = generateQuery(false, tagsConditions, req)
  }
  query.sort({ [sortCat]: sortOrder })
    .then((grants) => {
      res.json(grants)
    })
  })


router.get('/:grantId', (req, res) => {
  const { grantId } = req.query
  const idObj = mongoose.Types.ObjectId(grantId)
  Grant.find({ _id: idObj})
    .then((grnt) => {
      res.json(grnt)
    })
})


  

router.post('/admin/grants', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { grant } = req.body
  delete grant.username
  grant.tags = textToJson.formatTags(grant.tags)
  let grantModel = new Grant(grant)
  grantModel.save()
  res.json(grant)
})

router.post('/admin/grants/edit', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { grant } = req.body
  const { id } = req.query
  const newTags = textToJson.formatTags(grant.newTags)
  for (const tag of newTags) {
    tag.save()
  }
  delete grant.username
  delete grant.newTags
  grant.tags = textToJson.formatTags(grant.tags)
  grant.deadline = moment(grant.deadline, "YYYY-MM-DD").format()
  Grant.updateOne({ _id: mongoose.Types.ObjectId(id) }, { ...grant }).then((err, grnt) => {
    res.send({success: true})
  }).catch(err => console.log(err))
})




const generateQuery = (noTags, tagsConditions, req) => {
  if (noTags) {
    return Grant.find({
          $or: [
            { title: { $regex: req.body.filters[0], $options: "$i" } },
            { description: { $regex: req.body.filters[0], $options: "$i" } }]
          })
  } else {
    return Grant.find({
      $and: [
        {
          $or: tagsConditions
        },
        {
          $or: [
            { title: { $regex: req.body.filters[0], $options: "$i" } },
            { description: { $regex: req.body.filters[0], $options: "$i" } }]
        }
      ]
    })
  }
}



module.exports = router
