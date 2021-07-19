import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Layout } from "./components/layout/layout";
import 'bootstrap/dist/css/bootstrap.min.css';


ReactDOM.render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

function printToConsole(){
  let stylesHeader = [
    'color: green',
    'background: yellow',
    'font-size: 30px',
    'border: 4px solid red',
    'text-shadow: 2px 2px black',
    'padding: 10px',
  ].join(';');
  let stylesTopLine = [
    'color: black',
    'font-size: 20px',
    'border-top: 4px solid red',
    'border-right: 4px solid red',
    'border-left: 4px solid red',
    'padding: 10px',
  ].join(';');
  let stylesMiddleLines = [
    'color: black',
    'font-size: 20px',
    'border-right: 4px solid red',
    'border-left: 4px solid red',
    'padding: 10px',
  ].join(';');
  let stylesBottomLine = [
    'color: black',
    'font-size: 20px',
    'border-bottom: 4px solid red',
    'border-right: 4px solid red',
    'border-left: 4px solid red',
    'padding: 10px',
  ].join(';');
  console.log('%cHello There', stylesHeader,);
  console.log('%cIf you came all the way here you\'re probably looking for something           ', stylesTopLine);
  console.log('%cIf you do find any errors or even if you have any suggestions for improvement', stylesMiddleLines);
  // console.log('%cor even a job opportunity                                                    ', stylesMiddleLine);
  console.log('%cPlease let me know here - dshir27@gmail.com                                  ', stylesBottomLine);
}
printToConsole();