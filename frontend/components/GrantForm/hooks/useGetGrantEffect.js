import { useEffect } from 'react'

import { getGrant } from '../../../util/grants_api_util'
import { getTags } from '../../../util/tags_api_util'


export default (setGrantData, setTags, setTagOptions, grantId, tagOptions) => {
useEffect(() => {
    if (!tagOptions.length) {
      getTags().then((allTags) => {
        setTagOptions(Object.values(allTags.data))
      })
    } else if (grantId) {
        getGrant(grantId).then((res) => {
          const tagOptionNode = document.getElementById('tagSelect')
          const grant = res.data[0]
          const tagsArray = grant.tags.filter(Boolean).map((tag) => {
              const idx = tagOptionNode.querySelectorAll(`[data-tag='${tag.tag}']`)[0].dataset.id
              document.getElementById('tagSelect').options[idx].disabled = true
              return [tag.tag, Number(idx)]
          })
          setTags(tagsArray)
          setGrantData({
            title: grant.title,
            paymentDetails: grant.paymentDetails,
            currency: grant.currency,
            maxAward: grant.maxAward,
            link: grant.link,
            deadline: grant.deadline,
            disbursement: grant.disbursement,
            status: grant.status,
            location_elig: grant.location_elig,
            applicant_elig: grant.applicant_elig,
            description: grant.description,
            _id: grant._id,
    
          })
        })
      }
  }, [tagOptions])
}