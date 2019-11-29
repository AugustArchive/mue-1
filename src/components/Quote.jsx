//* Imports
import React from 'react';
import quotes from '../quotes.json';

export default class Quote extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
        quote: '',
        author: ''
    };
  }

  async getQuote() {
    try { // First we try and get a quote from the API...
      let data = await fetch('https://api.muetab.xyz/getQuote');
      data = await data.json();
      this.setState({ quote: data.quote, author: data.author });
    } catch (e) { // ..and if that fails we load one locally
      const quote = quotes[Math.floor(Math.random() * quotes.length)]; // Get a random quote from quotes.json
      this.setState({ 
        quote: quote.quote, 
        author: quote.author 
      }); // Set the quote
    }
  }

  componentDidMount() {
    this.getQuote();
  }

  render() {
    return [
      <h1 className='quote'>{`"${this.state.quote}"`}</h1>,
      // <i class="material-icons">perm_identity</i>,
      <h1 className='quoteauthor'>{`${this.state.author}`}</h1>,
    ];
  }
}
