Search = React.createClass({
    
    getInitialState() {
      return {
        searchingText: ''
      };
    },

    handleChange: function(event) {
        var searchingText = event.target.value;
        this.setState({searchingText: searchingText});

        if (searchingText.length > 2) {
            this.props.onSearch(searchingText);
        }
    },

    handleKeyUp: function(event) {
        if (event.keyCode === 13) {
            this.props.onSearch(this.state.searchingText);
        }
    },

handleSearch: function(searchingText) {  // 1.
    this.setState({
      loading: true  // 2.
    });
    this.getGif(searchingText, function(gif) {  // 3.
      this.setState({  // 4
        loading: false,  // a
        gif: gif,  // b
        searchingText: searchingText  // c
      });
    }.bind(this));
  },



    render: function() {
        var styles = {fontSize: '1.5em', width: '90%', maxWidth: '350px'};

        return <input
                 type="text"
                 onChange={this.handleChange}
                 onKeyUp={this.handleKeyUp}
                 placeholder="Tutaj wpisz wyszukiwaną frazę"
                 style={styles}
                 value={this.state.searchTerm}
                />
    }
});

