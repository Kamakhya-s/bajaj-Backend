import express from 'express';
import bodyParser  from "body-parser";
import cors from "cors" ;
import dotenv from 'dotenv'; 
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

function isPrime(num) {
    if (num <= 1) return false;
    if (num <= 3) return true;
    if (num % 2 === 0 || num % 3 === 0) return false;
    for (let i = 5; i * i <= num; i += 6) {
        if (num % i === 0 || num % (i + 2) === 0) return false;
    }
    return true;
}

app.post('/bfhl', (req, res) => {
   try {
     const data = req.body.data;
     const fileB64 = req.body.file_b64 || '';
     console.log('Backend Response:', res.data);
     const numbers = data.filter(item => !isNaN(item)).map(Number);
     const alphabets = data.filter(item => isNaN(item));
     const highestLowercaseAlphabet = alphabets.filter(item => item === item.toLowerCase()).sort().pop() || '';
 
     const isPrimeFound = numbers.some(isPrime);
 
     let fileValid = !!fileB64;
     let fileMimeType = '';
     let fileSizeKB = 0;
 
     if (fileB64) {
         try {
             const fileBuffer = Buffer.from(fileB64, 'base64');
             fileMimeType = 'application/octet-stream'; // Default MIME type
             fileSizeKB = (fileBuffer.length / 1024).toFixed(2);
             fileValid = true;
         } catch (error) {
             fileValid = false;
         }
     }
 
     res.json({
         is_success: true,
         user_id: 'john_doe_17091999',
         email: 'john@xyz.com',
         roll_number: 'ABCD123',
         numbers: numbers,
         alphabets: alphabets,
         highest_lowercase_alphabet: [highestLowercaseAlphabet],
         is_prime_found: isPrimeFound,
         file_valid: fileValid,
         file_mime_type: fileMimeType,
         file_size_kb: fileSizeKB
     });
   } catch (error) {
    res.status(400).json({ is_success: false, message: 'Error processing request' });
   }
});

app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
