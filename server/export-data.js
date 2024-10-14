const fs = require('fs');
const path = require('path');
const { Parser } = require('json2csv');

// Mock database connection (replace with actual database in production)
const db = require('./db-connection');

async function exportDataToCSV() {
  try {
    await db.connect();

    // Fetch data from database (mock implementation)
    const students = await db.query('SELECT * FROM students');
    const interventions = await db.query('SELECT * FROM interventions');
    const assignments = await db.query('SELECT * FROM assignments');
    const progressData = await db.query('SELECT * FROM progress_data');

    // Prepare data for CSV export
    const data = {
      students,
      interventions,
      assignments,
      progressData
    };

    // Define fields for each data type
    const fields = {
      students: ['id', 'name'],
      interventions: ['id', 'name'],
      assignments: ['id', 'studentId', 'interventionId', 'startDate', 'endDate', 'frequency', 'goal'],
      progressData: ['id', 'assignmentId', 'date', 'score']
    };

    // Create CSV files for each data type
    for (const [key, value] of Object.entries(data)) {
      const json2csvParser = new Parser({ fields: fields[key] });
      const csv = json2csvParser.parse(value);
      
      const filePath = path.join(__dirname, `../exports/${key}_export_${new Date().toISOString().split('T')[0]}.csv`);
      fs.writeFileSync(filePath, csv);
      
      console.log(`${key} data exported to ${filePath}`);
    }

    console.log('All data exported successfully');
  } catch (error) {
    console.error('Error exporting data:', error);
  } finally {
    await db.end();
  }
}

// Run the export function
exportDataToCSV();