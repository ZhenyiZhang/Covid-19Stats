# Covid-19Stats
api calls: <br/>
https://vast-reaches-02757.herokuapp.com/api/:municipalityName <br/>
All responses will be in JSON format and sources will be included in the end of the response <br/>

Example:<br/>
Region of Halton<br/>
https://vast-reaches-02757.herokuapp.com/api/halton<br/>
![Postman Example](https://githubcovid.s3.ca-central-1.amazonaws.com/Screen+Shot+2020-04-01+at+8.11.25+PM.png)

Municipalities' categorization was based on Association of Municipalities of Ontario
https://www.amo.on.ca/AMO-Content/Municipal-101/Ontario-Municipalities.aspx

![](https://githubcovid.s3.ca-central-1.amazonaws.com/Screen+Shot+2020-04-01+at+8.25.18+PM.png)

apis not only accept names of the municipalities' names. Names of sub-regions can also be accepted.<br/>
</br>
For example:
in the case of Halton region, Burlington is included in Halton, <br/>
so https://vast-reaches-02757.herokuapp.com/api/burlington will return the same result. <br/>
![](https://githubcovid.s3.ca-central-1.amazonaws.com/Screen+Shot+2020-04-01+at+10.39.40+PM.png)