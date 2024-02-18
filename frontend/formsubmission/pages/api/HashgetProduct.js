const { log } = console;
import axios from 'axios';

export default async function HashgetProduct(req, res) {
  if (req.method === 'POST') {
    try {
      const { productHash } = req.body;
      const obj = { productHash: productHash };

      log("obj: ", obj);
      
      // Use axios.post instead of axios.get
      const postresp = await axios.post('http://localhost:5001/getProduct', obj);

      log(postresp.status);
      // send this to getProduct page to its card
      if(postresp.status === 200)
      {
          res.send(postresp.data);
      }

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
