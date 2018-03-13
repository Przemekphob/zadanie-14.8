App = React.createClass({

    getInitialState() {
        return {
            loading: false,
            searchingText: '',
            gif: {}
        };
    },

    handleSearch: function(searchingText) {
        this.setState({
            loading: true
        }); 
        this.getGif(searchingText)
            .then(gif => {
                this.setState({
                    loading: false,
                    gif: gif,
                    searchingText: searchingText          
                });
            })
            .catch(error => console.log('Error', error));
    },

    getGif: function(searchingText) {  
        var GIPHY_PUB_KEY = 'vL0XZUL2TlbhD3wH2W27UOWvAkT4xIX5';
        var GIPHY_API_URL = 'https://api.giphy.com';
        var url = GIPHY_API_URL + '/v1/gifs/random?api_key=' + GIPHY_PUB_KEY + '&tag=' + searchingText;  

        return new Promise (
            function(resolve, reject) {
                var request = new XMLHttpRequest();
                request.onload = function () {
                    if (this.status === 200) {
                        resolve(gif); 
                    } else {
                        reject(new Error(this.statusText));
                    }
                };
                request.onerror = function () {
                    reject(new Error(
                       `XMLHttpRequest Error: ${this.statusText}`));
                };
                request.open('GET', url);
                request.send();
            }
        );
    },  
    
    render: function() {

        var styles = {
            margin: '0 auto',
            textAlign: 'center',
            width: '90%'
        };

        return (
          <div style={styles}>
                <h1>Wyszukiwarka GIFow!</h1>
                <p>Znajdź gifa na <a href='http://giphy.com'>giphy</a>. Naciskaj enter, aby pobrać kolejne gify.</p>
                <Search onSearch={this.handleSearch}/>
                <Gif
                    loading={this.state.loading}
                    url={this.state.gif.url}
                    sourceUrl={this.state.gif.sourceUrl}
                />                
          </div>
        );
    }
});