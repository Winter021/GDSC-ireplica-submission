const {log} = console;
import axios from 'axios';

const crypto = require('crypto');

function generateRandomOTP() {
  const randomPart = Math.floor(Math.random() * 9000) + 1000; // Generate a random 4-digit number
  const timestamp = Date.now().toString(); // Get current timestamp as a string

  // Extract the last 2 digits of the timestamp
  const lastTwoDigitsTimestamp = timestamp.slice(-2);

  // Combine the first 4 digits as random, and the last 2 digits as timestamp * first 4 digits
  const otp = randomPart.toString() + (parseInt(lastTwoDigitsTimestamp) * randomPart).toString().slice(-2);

  return otp;
}



async function convertProductPayload(reqPayload,dbproduct) {


    // console.log("db bprdoct in funciton , ", dbproduct)
  // Get current timestamp in seconds
    const currentTimeStamp = Math.floor(Date.now() / 1000);



    // // Use a suitable hashing algorithm (e.g., SHA-256) for GproductHash
    const hashAlgorithm = 'sha256';
    const hashInput = `${currentTimeStamp}_${reqPayload.productHash}_${reqPayload.yourEmail}`;
    const GtransactionHash = crypto.createHash(hashAlgorithm).update(hashInput).digest('hex');
    const Gtc = dbproduct.transactionCount;
 
    let Gstatus = false ;
    const Gotp = generateRandomOTP();
    if(  Gtc== 1 ) ;
    {
      log("Stataus chekc")
      Gstatus = true;
    }
      // const GimageLink = "/nolinkprovided";
    // const Gprice = parseInt(reqPayload.price, 10);
    // const Gtc = parseInt('1', 10);

    // log("Reqpaylod in function hash : ", reqPayload.productHash)

    // Create new product object
    const newProduct = {
        fromName: reqPayload.yourName,
        fromEmail: reqPayload.yourEmail,
        productHash: reqPayload.productHash,

        ownerName: dbproduct.ownerName,
        ownerEmail: dbproduct.ownerEmail,

        
        
        transactionHash: GtransactionHash,
        otp:Gotp,
        transactionStatus:Gstatus,
        // expiresAt:GeDate, // in UMT date format

        
    };

    // Return the new product object
    return newProduct;
}

export default async function reqTransaction(req, res) {
    

  if (req.method === 'POST'){
    try {
      let reqPayload = req?.body;
      const obj = { productHash: reqPayload.productHash };
      const dbproductresp = await axios.post('http://localhost:5001/getProduct', obj);
      const dbproduct = dbproductresp.data;
      // log("db prod ", dbproduct)

      
      if (typeof reqPayload === 'string')
      {
        reqPayload = JSON.parse(reqPayload);
      }
      
      // log("reqpayload before : ", reqPayload)
      reqPayload =  await convertProductPayload(reqPayload,dbproduct);
      
      if(reqPayload.Transactionstatus === false)
      {
        log("Product is already sold")
        res.status(400).send("Product is already sold");
      }
      
      // log("reqpayload after : ", reqPayload)

    //   const postresp = await axios.post('https://crudireplica-production.up.railway.app/register', reqPayload);
      const postresp = await axios.post('http://localhost:5001/registerTransaction', reqPayload);
    
      // const postresp = "Null";
    // log("post response status : " ,postresp.status)
    // log("post response data  : " ,postresp.data)
      const snobj = {
        status : postresp.status,
        transactionHash : postresp.data.transactionHash
      }

      if(postresp.status === 201)
      return res.send(snobj); 
    } 

    catch (error) 
    {
      console.log("SendForm could not register the Product (POST) " , error)

      if(error.status === 422)
      {
        console.log("422 error ")
        res.send(422); 
      }

      if(error.status === 201)
      {
        console.log("201 success  ")
        res.send(201); 
      }

      if(error.status === 500)
      {
        console.log("500 error ")
        res.send(500); 
      }

      return res.status(201).send(error);
    }

  }

  return res.status(500).json({
    msg: 'This should be a POST Request',
  });
}
