const resolver = {
    Query: {
        books: () => [
            {
                id: 1,
                name: 'De men phuu luu ky',
                genre: 'Adventure'
            },
            {
                id: 2,
                name: 'Lam giau khong kho',
                genre: 'Education'
            },
        ]
    }
}

module.exports = resolver