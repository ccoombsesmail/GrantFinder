const Grant = require('./models/Grant');

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
    let tags = project[i].split(',').map((tag) => tag.trim())
    const entry = {
      title: grantNames[i],
      description: description[i],
      links: links[i],
      amount: amount[i],
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