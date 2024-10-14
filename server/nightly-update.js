const Client = require('ssh2-sftp-client');
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

// Database connection (using a mock function for this example)
const db = require('./db-connection');

const sftpConfig = {
  host: 'your-sftp-server.com',
  port: 22,
  username: 'your-username',
  password: 'your-password'
  // Or use privateKey: fs.readFileSync('/path/to/private/key')
};

const remoteFilePath = '/path/to/student-data.csv';
const localFilePath = path.join(__dirname, 'temp-student-data.csv');

async function updateStudentData() {
  const sftp = new Client();
  
  try {
    await sftp.connect(sftpConfig);
    
    // Download the file from SFTP server
    await sftp.get(remoteFilePath, localFilePath);
    
    console.log('File downloaded successfully');
    
    // Process the CSV file
    const students = [];
    fs.createReadStream(localFilePath)
      .pipe(csv())
      .on('data', (row) => {
        students.push({
          id: row.id,
          name: row.name,
          // Add other fields as necessary
        });
      })
      .on('end', async () => {
        console.log('CSV file successfully processed');
        
        // Update database with new student data
        try {
          await db.connect();
          for (const student of students) {
            await db.query('INSERT INTO students (id, name) VALUES ($1, $2) ON CONFLICT (id) DO UPDATE SET name = $2', [student.id, student.name]);
          }
          console.log('Database updated successfully');
        } catch (error) {
          console.error('Error updating database:', error);
        } finally {
          await db.end();
        }
        
        // Delete the temporary file
        fs.unlinkSync(localFilePath);
      });
  } catch (error) {
    console.error('Error:', error);
  } finally {
    sftp.end();
  }
}

updateStudentData();