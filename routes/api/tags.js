const express = require("express")
const router = express.Router()
const Tag = require('../../models/Tag');
const passport = require('passport');
require('../../config/passport')(passport)


const fetch = require("node-fetch");

const fetcher = (txtFile) => {
  return fetch(`http://localhost:5000/${txtFile}`).then(response => response.text())
}




router.get('/', (req, res) => {
  Tag.find({}).then((tags) => res.json(tags))
})







router.get('/seedtags', (req, res) => {
  fetcher('project.txt').then(data => {
    const tagsRaw = data.split('\r\n')
    const allTags = {}
    tagsRaw.forEach((tagGroup) => {
      const tags = tagGroup.split(',')
      for (const tag of tags) {
        if (tag.trim() in allTags || tag === '') {
          continue
        }
        allTags[tag.trim()] = true
      }
    })

    Object.keys(allTags).forEach((tag) => {
      const tagEntry = new Tag({
        tag
      })
      if (tag !== "") {
        tagEntry.save()
      }
    })

  })
})


module.exports = router
