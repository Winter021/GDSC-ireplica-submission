const { log } = console;
import axios from 'axios';

async function verifyTransaction(otp,transactionObj)
{   
    const curtime  = new Date(Date.now());

    

    if(curtime >= transactionObj)
    {
        return false ;
    }
    
    if(   otp !== transactionObj.otp)
    {
        return false ;
    }

    
    return true ;
}

async function transferOwnership(T, P) {
    try {
        if (P.transactionCount > 1) {
            console.log("product already sold before");
            return false;
        }
        // console.log("p from transfer ownership fucntion s ",P);
        const newProduct = {
            productName: P.productName,
            ownerName: T.fromName,
            ownerEmail: T.fromEmail,
            manufacturerName: P.manufacturerName,
            imageLink: P.imageLink,
            productId: P.productId,
            productHash: P.productHash,
            transactionCount: 2,
            price: P.price
        };

        // console.log(newProduct)

        const prodhash = { productHash: T.productHash };
        const tranhash = { transactionHash: T.transactionHash };

        const tdelresp = await axios.post('http://localhost:5001/deleteProduct', prodhash);
        const pdelresp = await axios.post('http://localhost:5001/deleteTransaction', tranhash);

        if (pdelresp) {
            const newinsert = await axios.post('http://localhost:5001/registerProduct', newProduct);
            return true;
        }

        return false;
    } catch (error) {
        console.error(error);
        return false; // handle the error as needed
    }
}
export default async function verifyOTP(req, res) {
    // console.log("Veify otp")
  if (req.method === 'POST') {
    try {
      const { transactionHash ,otp } = req.body;
   
      
      const obj = { transactionHash: transactionHash };
      
    //   console.log("obje from verify otp server ,", obj)
      const postresp = await axios.post('http://localhost:5001/getTransaction', obj);
      const transactionObj = postresp.data;
      
      const prodhash = {productHash:transactionObj.productHash}
      const mainProduct = await axios.post('http://localhost:5001/getProduct', prodhash);
      
      //   console.log(mainProduct)
      var otpInteger = parseInt(otp, 10)
      var transctionpos = await verifyTransaction(otpInteger,transactionObj);
      
      // console.log(transactionsucc);
      
      if(transctionpos)
      {
          var transactionsucc = await transferOwnership(transactionObj,mainProduct.data);
          
          if(transactionsucc === true)
          {
              console.log("Transaction success");
              const mp = await axios.post('http://localhost:5001/getProduct', prodhash);

              res.json(
                  {
                      status:200,
                      data:mp.data
                    }
                );
                
                }
                else 
                {
                    console.log("Transaction failed")
                    const mp = await axios.post('http://localhost:5001/getProduct', prodhash);
                res.json(
                {
                    status:500,
                    data:mp.data
                }
            );
        }

    }

      // send this to getProduct page to its card
    //   if(postresp.status === 200)
    //   {
    //       res.send(postresp.data);
    //   }

    //   res.send(postresp.data);
    } catch (error) 
    {
      console.log("HashgetProduct could not find the Product (POST) ", error);
      return res.status(203).send(error);
    }
  }

  return res.status(500).json({
    msg: 'This should be a POST Request',
  });
}
