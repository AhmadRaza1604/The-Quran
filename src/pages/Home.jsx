import React,{ useEffect, useState } from 'react'
import axios from 'axios'
// import ('https://fonts.googleapis.com/css2?family=Jameel+Noori+Nastaleeq&display=swap');

const Home = () => {
  const [loading, setLoading] = useState(true)
  const [data0, setData0] = useState()
  const [data2, setData2] = useState()
  const [data3, setData3] = useState()
  const [data4, setData4] = useState()
  useEffect(() => {
    const fetchData = async () => {
      let config = {
        method: 'get',
      maxBodyLength: Infinity,
        url: `https://api.quran.com/api/v4/verses/random`,
        headers: { 
          'Accept': 'application/json'
        }
      };
      
      axios(config)
      .then((response) => {
        setData0(response.data.verse)
      })
      .catch((error) => {
        console.log(error);
      });
    }
    fetchData();
  },[]);
  useEffect(()=>{
    if(data0){
    const fetchData2 = async () => {
      setLoading(true)
      let config = {
        method: 'get',
      maxBodyLength: Infinity,
        url: `https://api.quran.com/api/v4/quran/verses/uthmani?verse_key=${data0.verse_key}`,
        headers: { 
          'Accept': 'application/json'
        }
      };
      let config1 = {
        method: 'get',
      maxBodyLength: Infinity,
        url: `https://api.quran.com/api/v4/quran/translations/${819}?verse_key=${data0.verse_key}`,
        headers: { 
          'Accept': 'application/json'
        }
      };
      let config2 = {
        method: 'get',
      maxBodyLength: Infinity,
        url: `https://api.quran.com/api/v4/quran/translations/${84}?verse_key=${data0.verse_key}`,
        headers: { 
          'Accept': 'application/json'
        }
      };
      axios(config)
      .then((response) => {
        setData2(response.data.verses[0]) // Access the first verse
      })
      axios(config2)
      .then((response) => {
        console.log(response.data)
        setData4(response.data.translations[0]) // Access the first verse
      })
      axios(config1)
      .then((response) => {
        setData3(response.data.translations[0]) // Access the first translation
        setLoading(false)
        
      })
      .catch((error) => {
        console.log(error);
      });
    }
    fetchData2();

  }
    
  },[data0])
  


  return (
    <div className='flex flex-col items-center justify-center '>
        <div className='flex flex-row-reverse items-center justify-center w-3/4 p-5 gap-1 bg-gray-200 rounded-3xl flex-wrap'>
        <h1 className='text-md mb-4 bg-red-500 p-2 rounded-xl' >بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ</h1>
        {!loading &&
          <div className='gap-0'>
          <div  className=' text-end bg-green-600 py-1 px-4 rounded-t-lg text-white'>
            <h1>{data2?.text_uthmani}</h1>
          </div>
          <div  className=' text-start bg-blue-600 py-1 px-4 text-white'>
            <h1 className='text-lg' style={{fontFamily: 'Jameel Noori Nastaleeq, sans-serif'}}>{data4?.text}</h1>
          </div>
          <div  className=' mb-2 text-end bg-teal-600 py-1 px-4 rounded-b-lg text-white'>
            <h1 className='text-lg' style={{fontFamily: 'Jameel Noori Nastaleeq, sans-serif'}}>{data3?.text}</h1>
          </div>

          </div>
          }
        
      
        </div>
        </div>
  )
};


export default Home;