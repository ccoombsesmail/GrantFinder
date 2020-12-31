const Grant = require('./models/Grant');
const Tag = require('./models/Tag');

const numPat = /\d+/g;

const textToJsonHelper = (data) => {
  const json = []
  const grantNames = data[0].split('\r\n')
  const description = data[1].split('\r\n')
  const links = data[2].split('\r\n')
  const amount = data[3].split('\r\n')
  const deadline = data[4].split('\r\n')
  const disbursement = data[5].split('\r\n')
  const location = data[6].split('\r\n')
  const applicant = data[7].split('\r\n')
  const project = data[8].split('\r\n')

  for (let i = 0; i < grantNames.length; i++) {
    let tags = project[i].split(',').map((tagName) => {
      if (tagName.trim() !== '') {
        return new Tag({
          tag: tagName.trim()
        })
      }
    })
    let numAmount = 0
    if (amount[i]) {
      let stringAmounts = amount[i].replace(/,/g, '').match(numPat)
      let numAmounts = [] 
      if (stringAmounts) {
        numAmounts = stringAmounts.map((amount) => Number(amount))
      }
      numAmount = Math.max(...numAmounts)
    }
    const entry = {
      title: grantNames[i],
      description: description[i],
      links: links[i],
      amount: amount[i],
      numAmount: numAmount,
      deadline: deadline[i],
      disbursement: disbursement[i],
      status: '',
      location_elig: location[i],
      applicant_elig: applicant[i],
      tags
    }
    json.push(new Grant(entry))
  }
 return json
}


module.exports = {
  textToJsonHelper
}