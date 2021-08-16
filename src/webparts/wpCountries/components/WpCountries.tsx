import * as React from 'react';
import styles from './WpCountries.module.scss';
import { IWpCountriesProps } from './IWpCountriesProps';
import { escape } from '@microsoft/sp-lodash-subset';

import * as jquery from 'jquery';

import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';



export interface IRShowListItemsWPState {
  listitems: [
    {
      "name": "",
      "capital": "",
      "region" : "",
      "flag" : "",
      "population" : "",
      "subregion" : "",
      "cioc" : "",
      
    }
  ]
}


export default class WpCountries extends React.Component<IWpCountriesProps,IRShowListItemsWPState> {

  public constructor(props: IWpCountriesProps, state: IRShowListItemsWPState) {
    super(props);    
    this.state = {
      listitems: [
        {
          "name": "",
          "capital": "",
          "region" : "",
          "flag" : "",
          "population" : "",
          "subregion" : "",
          "cioc" : ""
        }
      ]
    };
  }


  public componentDidMount() {
    let reactcontexthandler=this;
    
    jquery.ajax({
      url: `https://restcountries.eu/rest/v2/all`,
      type: "GET",
      headers: { 'Accept': 'application/json; odata=verbose;' },
      success: function (resultData) {
        reactcontexthandler.setState({
          listitems: resultData
        });
      },
      error: function (jqXHR, textStatus, errorThrown) {
      }
    });
  }


  public render(): React.ReactElement<IWpCountriesProps> {

    

  return (
    
    <ImageList>
      {this.state.listitems.map((countrie) => (
         <ImageListItem>        
         <img
           src={`${countrie.flag}?w=248&fit=crop&auto=format`}
           srcSet={`${countrie.flag}?w=248&fit=crop&auto=format&dpr=2 2x`}
           alt={countrie.name}
           loading="lazy"
         />   
         <ImageListItemBar
           title={countrie.name}
           subtitle={countrie.capital}
           actionIcon={
             <IconButton onClick={()=>this.AlertMe(countrie.population,countrie.region,countrie.subregion,countrie.cioc)}> 
               <InfoIcon />
             </IconButton>  
           }
         /> 
       </ImageListItem>
      ))}
    </ImageList>
  );
}


AlertMe(poblacion,region, subRegion,cioc)
{  
  alert(
    'Información Adicional: \n\n' 
    + "Población: '"+ poblacion +"'\n" 
    + "Región: '"+ region +"'\n" 
    + "Sub Región: '"+ subRegion +"'\n" 
    + "Cioc: '"+ cioc +"'\n" 
  );  
}
}