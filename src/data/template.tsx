const templatedata =

`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Khaled Mejri - CV</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            width: 100%;
            margin: 0 auto;
            padding: 30px;
            display: flex;
            flex-wrap: wrap;
        }
        .column {
            flex: 1;
            padding: 10px;
        }
        h1, h2, h3 {
            margin: 0;
            padding: 0;
        }
        h1 {
            font-size: 2em;
            color: #006f4e;
        }
        h2 {
            font-size: 1.5em;
            margin-top: 10px;
            color: #039a6d;
        }
        h3 {
            font-size: 1.2em;
            margin-bottom: 10px;
            color: #006f4e;
        }
        .section {
            margin-bottom: 20px;
        }
        .contact-info p {
            margin-bottom: 5px;
        }
        .work-experience ul, .education ul {
            margin: 0;
            padding: 0;
        }
        .work-experience li, .education li {
            margin-bottom: 15px;
            padding-bottom: 10px;
            border-bottom: 1px dashed #ddd;
        }
        .photo img {
            width: 200px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="column">
            <div class="photo">
                <img src="https://img.freepik.com/photos-gratuite/beau-mec-barbu-posant-contre-mur-blanc_273609-20597.jpg?size=626&ext=jpg&ga=GA1.1.2113030492.1720310400&semt=sph" alt="Khaled Mejri Photo">
            </div>
            <div class="section">
                <h1>Khaled Mejri</h1>
                <h2>Ingénieur Informatique</h2>
            </div>
            <div class="section contact-info">
                <h3>Contact Information</h3>
                <p>+21612345678</p>
                <p>khaled.mejbri@gmail.com</p>
                <p>Rue de la Liberté, Tunis</p>
            </div>
        </div>
        <div class="column">
            <div class="section work-experience">
                <h3>Professional Experiences</h3>
                <ul>
                    <li>
                        <h4>Teamwill</h4>
                        <p>Développeur Java - Duration: 4 years</p>
                    </li>
                    <li>
                        <h4>help group</h4>
                        <p>Développeur full stack - Duration: 1 year</p>
                    </li>
                </ul>
            </div>
            <div class="section education">
                <h3>Education</h3>
                <ul>
                    <li>
                        <h4>Université de Tunis</h4>
                        <p>June 15, 2016 - Mention: Très Bien</p>
                    </li>
                </ul>
            </div>
            <div class="section stages">
                <h3>Internships</h3>
                <ul>
                    <li>
                        <h4>Digital factory</h4>
                        <p>Développement Web - Duration: 0.5 month(s)</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</body>
</html>
`
export default templatedata;
