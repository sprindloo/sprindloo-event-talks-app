const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public'));

const talks = [
    {
        "title": "The Future of AI",
        "speakers": ["John Doe"],
        "category": ["AI", "Machine Learning"],
        "duration": "60",
        "description": "A talk about the future of AI and its impact on society."
    },
    {
        "title": "Demystifying Quantum Computing",
        "speakers": ["Jane Smith"],
        "category": ["Quantum Computing", "Physics"],
        "duration": "60",
        "description": "An introduction to the principles of quantum computing."
    },
    {
        "title": "The Rise of Serverless",
        "speakers": ["Peter Jones"],
        "category": ["Cloud", "Architecture"],
        "duration": "60",
        "description": "A deep dive into serverless architectures and their benefits."
    },
    {
        "title": "Web Assembly in the Real World",
        "speakers": ["Mary Johnson", "David Williams"],
        "category": ["Web", "Performance"],
        "duration": "60",
        "description": "Practical applications of Web Assembly for high-performance web apps."
    },
    {
        "title": "Securing Your Applications",
        "speakers": ["Susan Brown"],
        "category": ["Security"],
        "duration": "60",
        "description": "Best practices for building secure and resilient applications."
    },
    {
        "title": "The Art of UX Design",
        "speakers": ["Michael Davis"],
        "category": ["UX", "Design"],
        "duration": "60",
        "description": "A guide to creating intuitive and user-friendly interfaces."
    }
];

app.get('/api/talks', (req, res) => {
    res.json(talks);
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
