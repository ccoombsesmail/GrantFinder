const Grant = require('./models/Grant');
const Tag = require('./models/Tag');
const moment = require('moment')

const numPat = /\d+/g;
const currencies = ["Lek", "؋", "$", "ƒ", "₼", "p.",
  "BZ$", "$", "$b", "KM", "лв", "R$", "$", "៛", "$", "$", "$", "¥",
  "$", "₡", "kn", "₱", "Kč", "RD$", "$", "kr", "€", "£", "$", "₾",
  "¢", "£", "$", "Ft", "kr", "₹", "Rp", "﷼",
  "£", "₪", "J$", "¥", "£", "лв", "₩", "₩", "лв", "₭", "Ls", "£",
  "$", "Lt", "ден", "RM", "₨", "$", "₮", "MT", "$", "₨", "ƒ", "$", "C$",
  "₦", "kr", "﷼", "₨", "B/.", "Gs", "₱", "zł", "﷼", "lei", "₽", "£", "﷼", "Дин.", "₨", "$", "$",
  "₨", "kr", "CHF", "$", "£", "NT$", "฿", "TT$", "₺", "$", "₴", "£",
  "$U", "лв", "Bs", "₫", "﷼", "Z$"]

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
    let tags = formatTags(project[i])
    const currencySymbol = getSymbol(amount[i])
    let maxAward = 0
    let deadlineDate = moment('01/01/2050', "MM-DD-YYYY").format()
    if (amount[i]) {
      maxAward = getNumericalAmount(amount[i])
    }
    if (deadline[i] && hasNumber(deadline[i]) && deadline[i] !== '\n' && deadline[i] !== ' ') {
      date = moment(deadline[i], "MM-DD-YYYY");
      deadlineDate = date.format()
    }
    const entry = {
      title: grantNames[i],
      description: description[i],
      links: links[i],
      amount: amount[i],
      maxAward,
      currencySymbol,
      deadline: deadlineDate,
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


const formatTags = (tags) => {
  if (typeof tags === 'string') {
    return tags.split(',').map((tagName) => {
      if (tagName.trim() !== '') {
        return new Tag({
          tag: tagName.trim()
        })
      }
    })
  }
  return tags.map((tagName) => {
    if (tagName.trim() !== '') {
      return new Tag({
        tag: tagName.trim()
      })
    }
  })
}


const getSymbol = (amountDetails) => {
  for (const curr of currencies) {
    if (amountDetails.includes(curr)) {
      return curr
    }
  }
  return '?'
}

const getNumericalAmount = (amount) => {
  let numAmount = 0
  let stringAmounts = amount.replace(/,/g, '').replace(/\./g, '').match(numPat)
  let numAmounts = []
  if (stringAmounts) {
    numAmounts = stringAmounts.map((amount) => Number(amount))
  }
  if (numAmounts.length > 0) numAmount = Math.max(...numAmounts)
  return numAmount
}

function hasNumber(myString) {
  return /\d/.test(myString);
}

module.exports = {
  textToJsonHelper,
  formatTags,
  getNumericalAmount
}






