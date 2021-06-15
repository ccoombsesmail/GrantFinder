import React, {useState, useEffect} from 'react'
import { getAllGrants } from '../../util/grants_api_util'
import styles from './ExportGrantData.module.css'
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const ExportGrantData = () => {

  const [grantData, setGrantData] = useState([])

  useEffect(() => {
    getAllGrants().then((res) => {
      const formatedGrants = res.data.map((grant) => {
        const newGrant = {...grant}
        delete newGrant.__v
        newGrant.tags = newGrant.tags.map((tag) => {
          if (tag) { 
            return tag.tag 
          }
        }).join(',')
        return newGrant
      })
      setGrantData(formatedGrants)
    })
  }, [])

  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
  const fileExtension = '.xlsx'

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }

  return (
    <button className={styles.button} onClick={(e) => exportToCSV(grantData, 'data')}>
      Export Grant Data
    </button>
  )
}

export default ExportGrantData
