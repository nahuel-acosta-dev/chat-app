import { FC, ReactElement } from "react";
import { Props } from "../../types/generics";

const title = [
    {letter: 'T',
    className: 'text-primary'},
    {letter: 'i',
    className: 'text-green'},
    {letter: 'n',
    className: 'text-vanilla'},
    {letter: 'g',
    className: ''},
    {letter: 'l',
    className: 'text-primary'},
    {letter: 'e',
    className: 'text-green'},
    {letter: 't',
    className: 'text-vanilla'},
    {letter: 's',
    className: ''},
];

const Title = () => {

    return(
    <>
       { title.map((details, i) => (
            <span className={`${details.className} fw-bold`} key={i}>
                {details.letter}
            </span> )
        )} 
    </>
    )
}

export default Title;