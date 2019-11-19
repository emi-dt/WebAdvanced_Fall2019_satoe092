import React from 'react';
import './SearchResults.css';

const SearchResults = (props) => {

    let currentResults = [
        {
            title: "First title",
            link: "https://www.firstlink.nytimes.com/2017/11/10/science/reptiles-amphibians-pets.html",
            data: "Nov 10, 2017",
            description: "Reptiles make great first pets. They don't take up a lot of space, their needs are simple, and they are fun and adorable. Considering there are many different types of pet reptiles with varying levels of care needs, you are bound to find one that fits your family perfectly!"
        },
        {
            title: "Second title",
            link: "https://www.firstlink.nytimes.com/2017/11/10/science/reptiles-amphibians-pets.html",
            data: "Nov 10, 2017",
            description: "Reptiles make great first pets. They don't take up a lot of space, their needs are simple, and they are fun and adorable. Considering there are many different types of pet reptiles with varying levels of care needs, you are bound to find one that fits your family perfectly!"
        },
        {
            title: "Third title",
            link: "https://www.firstlink.nytimes.com/2017/11/10/science/reptiles-amphibians-pets.html",
            data: "Nov 10, 2017",
            description: "Reptiles make great first pets. They don't take up a lot of space, their needs are simple, and they are fun and adorable. Considering there are many different types of pet reptiles with varying levels of care needs, you are bound to find one that fits your family perfectly!"
        }, 
        {
            title: "Fourth title",
            link: "https://www.firstlink.nytimes.com/2017/11/10/science/reptiles-amphibians-pets.html",
            data: "Nov 10, 2017",
            description: "Reptiles make great first pets. They don't take up a lot of space, their needs are simple, and they are fun and adorable. Considering there are many different types of pet reptiles with varying levels of care needs, you are bound to find one that fits your family perfectly!"
        },
        {
            title: "Fifth title",
            link: "https://www.firstlink.nytimes.com/2017/11/10/science/reptiles-amphibians-pets.html",
            data: "Nov 10, 2017",
            description: "Reptiles make great first pets. They don't take up a lot of space, their needs are simple, and they are fun and adorable. Considering there are many different types of pet reptiles with varying levels of care needs, you are bound to find one that fits your family perfectly!"
        },
        {
            title: "Sixth title",
            link: "https://www.firstlink.nytimes.com/2017/11/10/science/reptiles-amphibians-pets.html",
            data: "Nov 10, 2017",
            description: "Reptiles make great first pets. They don't take up a lot of space, their needs are simple, and they are fun and adorable. Considering there are many different types of pet reptiles with varying levels of care needs, you are bound to find one that fits your family perfectly!"
        },
        {
            title: "Seventh title",
            link: "https://www.firstlink.nytimes.com/2017/11/10/science/reptiles-amphibians-pets.html",
            data: "Nov 10, 2017",
            description: "Reptiles make great first pets. They don't take up a lot of space, their needs are simple, and they are fun and adorable. Considering there are many different types of pet reptiles with varying levels of care needs, you are bound to find one that fits your family perfectly!"
        },
        {
            title: "Eighth title",
            link: "https://www.firstlink.nytimes.com/2017/11/10/science/reptiles-amphibians-pets.html",
            data: "Nov 10, 2017",
            description: "Reptiles make great first pets. They don't take up a lot of space, their needs are simple, and they are fun and adorable. Considering there are many different types of pet reptiles with varying levels of care needs, you are bound to find one that fits your family perfectly!"
        },
        {
            title: "Nineth title",
            link: "https://www.firstlink.nytimes.com/2017/11/10/science/reptiles-amphibians-pets.html",
            data: "Nov 10, 2017",
            description: "Reptiles make great first pets. They don't take up a lot of space, their needs are simple, and they are fun and adorable. Considering there are many different types of pet reptiles with varying levels of care needs, you are bound to find one that fits your family perfectly!"
        },
        {
            title: "Third title",
            link: "https://www.firstlink.nytimes.com/2017/11/10/science/reptiles-amphibians-pets.html",
            data: "Nov 10, 2017",
            description: "Reptiles make great first pets. They don't take up a lot of space, their needs are simple, and they are fun and adorable. Considering there are many different types of pet reptiles with varying levels of care needs, you are bound to find one that fits your family perfectly!"
        },
        {
            title: "Third title",
            link: "https://www.firstlink.nytimes.com/2017/11/10/science/reptiles-amphibians-pets.html",
            data: "Nov 10, 2017",
            description: "Reptiles make great first pets. They don't take up a lot of space, their needs are simple, and they are fun and adorable. Considering there are many different types of pet reptiles with varying levels of care needs, you are bound to find one that fits your family perfectly!"
        },
        {
            title: "Third title",
            link: "https://www.firstlink.nytimes.com/2017/11/10/science/reptiles-amphibians-pets.html",
            data: "Nov 10, 2017",
            description: "Reptiles make great first pets. They don't take up a lot of space, their needs are simple, and they are fun and adorable. Considering there are many different types of pet reptiles with varying levels of care needs, you are bound to find one that fits your family perfectly!"
        }
    ]

    return(
        <div className="SearchResults">

            <p className="results-number">About 69,800,000 results (0.77 seconds) </p>

            
            
            <ul className="results">
            {currentResults.map((value) => {
            return <li className="result">
                    {/* title */}
                    {/* link */}
                    {/* description with data */}
                    <a className="result-hyperlink" href="">
                        <h2 className="result-title">{value.title}</h2>
                        <p className="result-link">{value.link}</p>
                    </a>
                    <p className="result-description"><span className="result-data">{value.data} - </span>{value.description}</p>
                </li>



        })}

                
            </ul>

        </div>
    );
}



export default SearchResults;