const {log} = console;
import axios from 'axios';

const crypto = require('crypto');

async function convertProductPayload(reqPayload) {
    // Get current timestamp in seconds
    const currentTimeStamp = Math.floor(Date.now() / 1000);

    // Generate GproductId as an integer timestamp
    const GproductId = currentTimeStamp;

    // Use a suitable hashing algorithm (e.g., SHA-256) for GproductHash
    const hashAlgorithm = 'sha256';
    const hashInput = `${currentTimeStamp}_${reqPayload.productName}`;
    const GproductHash = crypto.createHash(hashAlgorithm).update(hashInput).digest('hex');
    const GimageLink = "/nolinkprovided";
    const Gprice = parseInt(reqPayload.price, 10);
    const Gtc = parseInt('1', 10);
  


    // Create new product object
    const newProduct = {
        productName: reqPayload.productName,
        ownerName: reqPayload.ownerName,
        ownerEmail: reqPayload.ownerEmail,
        manufacturerName:reqPayload.manufacturerName,
        imageLink:GimageLink,
        productId: GproductId,
        productHash: GproductHash,
        transactionCount: Gtc,
        price: Gprice
    };

    // Return the new product object
    return newProduct;
}

export default async function ProductInputForm(req, res) {
  if (req.method === 'POST'){
    try {
      let reqPayload = req?.body;

      if (typeof reqPayload === 'string')
      {
        reqPayload = JSON.parse(reqPayload);
      }

      log("reqpayload before : ", reqPayload)
      reqPayload = await convertProductPayload(reqPayload);
      log("reqpayload after : ", reqPayload)

    //   const postresp = await axios.post('https://crudireplica-production.up.railway.app/register', reqPayload);
      const postresp = await axios.post('http://localhost:5001/registerProduct', reqPayload);
    
      // const postresp = "Null";
    log("post response status : " ,postresp.status)

      if(postresp.status === 201)
      return res.json(
        {
          status : 201,
          productData:reqPayload
        }
        ); 
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
