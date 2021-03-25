import SearchPresenter from "./SearchPresenter";
import React from "react";
import { moviesApi, tvApi } from "api";

class SearchContainer extends React.Component{
    state ={
        movieResults: null,
        tvResults: null,
        searchTerm: "",
        error: null,
        loading: false
    }

    componentDidMount() {
        this.handleSubmit();
    }

    handleSubmit = () => {
        const { searchTerm } = this.state;
        if(searchTerm !== "") {
            this.searchByTerm();
        }
    }

    searchByTerm = async() => {
        const { searchTerm } = this.state;
        try {
            const { data: { results: movieResults } } = await moviesApi.search(searchTerm);
            const { data: { results: tvResults } } = await tvApi.search(searchTerm);
            this.setState({
                loading: true,
                movieResults,
                tvResults
            })
        } catch {
            this.setState({
                error: "Can't find anything😥"
            })
        } finally {
            this.setState({
                loading: false
            })
        }
    }

    render() {
        const { movieResults, tvResults, searchTerm, error, loading } = this.state;
        return (
            <SearchPresenter 
                movieResults = {movieResults}
                tvResults = {tvResults}
                searchTerm = {searchTerm}
                error = {error}
                loading = {loading}
                handleSubmit = {this.handleSubmit}
            />
        )
    }
}

export default SearchContainer;