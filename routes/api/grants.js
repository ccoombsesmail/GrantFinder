const express = require("express")
const router = express.Router()
const Grant = require('../../models/Grant');
const Tag = require('../../models/Tag');
const passport = require('passport');
require('../../config/passport')(passport)


const fetch = require("node-fetch");
const textToJson = require('../../txtToJson')

const fetcher = (txtFile) => {
  return fetch(`http://localhost:3000/${txtFile}`).then(response => response.text())
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


router.post('/', (req, res) => { 
  const sortCat = req.body.filters[2][0]
  const sortOrder = Number(req.body.filters[2][1])
  Grant.find({ tags: { $all: req.body.filters[1] }, title: { $regex: req.body.filters[0], $options: "$i" } }).limit(40).sort({ [sortCat]: sortOrder })
    .then((grants) => res.json(grants))
})


router.post('/admin/grants', passport.authenticate('jwt', { session: false }), (req, res) => {
  let grant = new Grant({
    grant_title: req.body.grant_title,
    tags: req.body.tags,
    amount: Number(req.body.amount)
  })
  grant.save()
  res.json(grant)
})



module.exports = router
