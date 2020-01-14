import React from 'react';
import { connect } from "react-redux";
import Router from 'next/router';

/**  Components **/
import AutocompliteInput from '../Materialize/AutocompliteInput';

/**  Actions  **/
import {   changeSearchLocation, changeSearchKeyword } from '../../store/actions';




class SearchBox extends React.Component{
    constructor(props) {
        super(props);

        this.state={
            locations:[] // Autocomplete list of results will be passed down to Autocomplete component
        };


        this.locationTermChanged = this.locationTermChanged.bind(this);
        this.newLocationSelected = this.newLocationSelected.bind(this);
        this.businessChanged = this.businessChanged.bind(this);
        this.submit = this.submit.bind(this);
    }


    submit(){
        console.warn('submit', this.search);
        let locationArr = this.props.search.location.split(',');
        let city, state, district;
        let link;
        console.warn('locationArr', locationArr);

        const toUrlFormat = (val) => {
            return val.trim().split(' ').join('-');
        };


        // {district, city, state}
        if(locationArr.length == 3){


        }
        else{

        }



        console.warn('link', link);

        Router.push(link);
    }

    businessChanged(term){
        console.warn('businessChanged', term);

        // Update Search Store
        this.props.changeSearchKeyword(term);
    }


    newLocationSelected(newValue){
        console.warn('newLocationSelected', newValue);

        // Update Search store
        this.props.changeSearchLocation(newValue);
    }
    locationTermChanged(term){


    }

    render(){

        const { visitor }= this.props;
        const userLocation = visitor.location ? `${visitor.location.city}, ${visitor.location.region}` : null;

        return(<div className="searchBox">

            <div data-test="searchButton" className="field field1">
                <i className="material-icons prefix">search</i>
                <input onChange={e=>this.businessChanged(e.target.value)}   placeholder="Search by business or keyword"  type="text" autoComplete="off" />
            </div>

            {/*<div className="col s6">*/}
                {/*<AutocompliteInput  onChange={this.businessChanged} icon="search" placeholder="Search by business or keyword"/>*/}

            {/*</div>*/}

            <div className="field2">
                <AutocompliteInput onChange={this.locationTermChanged}
                                   newLocationSelected={this.newLocationSelected}
                                   data={this.state.locations}
                                   defaultValue={userLocation}
                                   icon="location_on"
                                   placeholder="Location"/>
                <a onClick={this.submit} className="btn" style={{   padding: '21px', lineHeight: '4px'}}>
                    <i className="material-icons white-text">search</i>
                </a>
            </div>

            {/*<div className="col s1" style={{margin:'0px', padding:'0px'}}>*/}
                {/*<div className="valign-wrapper" >*/}
                    {/*<a onClick={this.submit} className="btn" style={{marginTop: '15px', marginLeft: '-12px', padding: '22px', lineHeight: '4px'}}>*/}
                        {/*<i className="material-icons white-text">search</i>*/}
                    {/*</a>*/}
                {/*</div>*/}
            {/*</div>*/}

        </div>);
    }
}

const mapStateToProps = state => {
    return {
        visitor: state.visitor,
        search: state.search
    };
};

export default connect(mapStateToProps, { changeSearchLocation, changeSearchKeyword})(SearchBox);