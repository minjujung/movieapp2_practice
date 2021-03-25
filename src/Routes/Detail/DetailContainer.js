import DetailPresenter from "./DetailPresenter";
import React from "react";
import { moviesApi, tvApi } from "api";

class DetailContainer extends React.Component{
    constructor(props) {
        super(props);
        const { location: { pathname } } = props;
        this.state = {
            result: null,
            error: null,
            loading: true,
            isMovie:  pathname.includes("/movie/")
        }
    }

    async componentDidMount() {
        const { 
            match : { 
                params: { id } 
            }, 
            history: { push }
         } = this.props;
        const { isMovie } = this.state;
        const parseId = parseInt(id);
        if(isNaN(parseId)) {
           return push("/");
        }
        let result = null;       
        try {
            if(isMovie) {
                ({ data: result } = await moviesApi.movieDetail(parseId));
            } else {
                ({ data: result } = await tvApi.showDetail(parseId));
            }
            // console.log(result);          
        } catch {
            this.setState({
                error: "Can't find any information of this!"
            })
        } finally {
            this.setState({
                loading: false,
                result
            })
        }

    }

    render() {
        // console.log(this.props);
        const { result, error, loading } = this.state;
        return (
            <DetailPresenter 
                result = {result}
                error = {error}
                loading = {loading}
            />
        )
    }
}

export default DetailContainer;