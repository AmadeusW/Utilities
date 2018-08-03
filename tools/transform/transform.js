var transformApp = new Vue({
    el: '#transformApp',
    data: {
        input: 'Sample Text',
        currentFilter: 'lowercase'
    },
    filters: {
        filter: function (value, method) {
            switch (method) {
                case "lowercase":
                    return value.toLowerCase();
                    case "unescape":
                    return unescape(value.replace(/['"]+/g, ''));
                default:
                    return value;
            }
        },
    },
    methods: {
        toolUnescape: function () {
            console.log("un!");
            this.currentFilter = 'unescape'
        },
        toolLowercase: function () {
            console.log("tolo");
            this.currentFilter = 'lowercase'
        },
        getFilter: function() {
            return this.currentFilter;
        }
    }
})
