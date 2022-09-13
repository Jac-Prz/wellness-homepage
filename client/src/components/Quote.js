import { useEffect, useState } from 'react';

const Quote = () => {
    const [quote, setQuote] = useState(null);
    useEffect(() => {
        const fetchQuote = async () => {
            const response = await fetch('https://type.fit/api/quotes');
            const json = await response.json();
            if (response.ok) {
                const randomQuote = Math.floor(Math.random() * json.length);
                setQuote(json[randomQuote]);
            }
        }

        fetchQuote();

    }, [])
    return (
        <div id="quote-section" className="quote section">
            <h4>{quote && quote.text}</h4>
            <p>{quote && quote.author}</p>
        </div>
    )
}
export default Quote;