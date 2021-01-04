const express = require("express")
const router = express.Router()
const Grant = require('../../models/Grant');
const passport = require('passport');
require('../../config/passport')(passport)
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false);

const fetch = require("node-fetch");
const textToJson = require('../../txtToJson')

const fetcher = (txtFile) => {
  return fetch(`http://localhost:5000/${txtFile}`).then(response => response.text())
}




router.get('/seed', (req, res) => {
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
  Grant.find({ $or: tagsConditions, title: { $regex: req.body.filters[0], $options: "$i" } }).limit(40).sort({ [sortCat]: sortOrder })
    .then((grants) => {
      res.json(grants)
    })
  })


router.get('/', (req, res) => {
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
  grant.numAmount = textToJson.getNumericalAmount(grant.amount)
  let grantModel = new Grant(grant)
  grantModel.save()
  res.json(grant)
})

router.post('/admin/grants/edit', passport.authenticate('jwt', { session: false }), (req, res) => {
  const { grant } = req.body
  const { id } = req.query
  delete grant.username
  grant.tags = textToJson.formatTags(grant.tags)
  grant.numAmount = textToJson.getNumericalAmount(grant.amount)
  console.log(id)
  Grant.updateOne({ _id: mongoose.Types.ObjectId(id) }, { ...grant }).then((err, grnt) => {
    if (err) console.log(err)
    res.send({success: true})
  }).catch(err => console.log(err))
})




module.exports = router
