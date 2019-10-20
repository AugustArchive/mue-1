import React from 'react';
import Fetch from 'unfetch';

const getCookie = (cookiename) =>  {
    const cookiestring = RegExp('' + cookiename + '[^;]+').exec(document.cookie);
    return unescape(!!cookiestring ? cookiestring.toString().replace(/^[^=]+./,'') : '');
};
  
const randomInt = (min, max) => { return Math.floor(Math.random() * (max - min + 1)) + min; };
  
export default class Background extends React.Component {
  // Set background: Attempt to get one from the API first, and if that fails then use the offline ones.
  async getAndSetBackground() {
    const root = document.getElementById('root');
    
    try {
      let data = await Fetch('https://api.muetab.xyz/getImage?category=Outdoors');
      data     = await data.json(); 

      const checkRepeat = getCookie('backgroundimageurl');
      document.getElementById('photographer').innerText = `Photo by ${data.photographer}`;
      document.getElementById('location').innerText     = `${data.location}`;

      if (checkRepeat !== root.style.backgroundImage) root.style.backgroundImage = `url(${data.file})`;
      else {
        /*let data = await Fetch('https://api.muetab.xyz/getImage?category=Outdoors');
        data = await data.json();*/ 
        document.cookie            = 'backgroundimageurl; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        root.style.backgroundImage = `url(${data.file})`;
        document.cookie            = `backgroundimageurl=${data.file}`;
      }
    } catch (e) {
      document.getElementById('backgroundCredits').style.display = 'none';
      document.getElementById('photographer').innerText          = 'Photo from Pexels';
      root.style.backgroundImage = `url(../offline-images/${randomInt(1, 25)}.jpeg)`;
    }
  }

  componentDidMount() {
    this.getAndSetBackground();
  }

  render() {
    return null;
  }
}