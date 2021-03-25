import MoviePresenter from "./MoviePresenter";
import React from "react";
import { moviesApi } from "api";

class MovieContainer extends React.Component{
    state = {
        nowPlaying: null,
        upComing: null,
        popular: null,
        error: null, 
        loading: true 
    };

    async componentDidMount() {
     try {
        const { data: { results: nowPlaying }} = await moviesApi.nowPlaying();
        const { data: { results: upComing }} = await moviesApi.upComing();
        const { data: { results: popular }} = await moviesApi.popular();
        this.setState({
            nowPlaying,
            upComing,
            popular
        })
     } catch {
        this.setState({
            error: "Can't find movie information!"
        })
     } finally {
        this.setState({
             loading: false
        })
     }
    }

    render() {
        const { nowPlaying, upComing, popular, error, loading } = this.state;
        // console.log(this.state);
        return (
            <MoviePresenter 
                nowPlaying = {nowPlaying}
                upComing = {upComing}
                popular = {popular}
                error = {error}
                loading = {loading}
            />
        )
    }
}

export default MovieContainer;