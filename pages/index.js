import Navbar from "@/components/Navbar"
import fetch from 'node-fetch';

export default function Home({lost,found,sell}) {
  return (
    <div>
      <Navbar/>
      <h1 className="mt-20">LOST ITEMS: </h1>
      {lost.map((item) => (
        <div>
          <li>{item.product}</li>
          <li>{item.specs}</li>
          <li>{item.place}</li>
          <br></br>
        </div>   
      ))}

      <h1>FOUND ITEMS: </h1>
      {found.map((item) => (
        <div>
          <li>{item.product}</li>
          <li>{item.specs}</li>
          <li>{item.place}</li>
          <br></br>
        </div> 
      ))}

      <h1>SELL ITEMS: </h1>
      {sell.map((item) => (
        <div>
          <li>{item.product}</li>
          <li>{item.specs}</li>
          <li>{item.oPrice}</li>
          <li>{item.sPrice}</li>
          <br></br>
        </div>  
      ))}
       
    </div>
    
  )
}

export async function getStaticProps() {
  const [res1, res2,res3] = await Promise.all([
    fetch('http://localhost:4000/getAll?type=lost'),
    fetch('http://localhost:4000/getAll?type=found'),
    fetch('http://localhost:4000/getAll?type=sell')
  ]);

  const lost = await res1.json();
  const found = await res2.json();
  const sell= await res3.json();
  return {
    props: {
      lost,
      found,
      sell
    },
  };
}