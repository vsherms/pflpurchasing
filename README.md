# PFL Purchasing

# Work-flow Guidelines
If you'd like to work on the repository please take this tutorial on React Native: https://facebook.github.io/react/

# Purchasing
Register and Log In with your PFL credentials to place an order with Printing For Less.

# Work-Flow Guidelines
If you'd like to work on the repository please take read through this document.


## Work on a personal copy:
1. FORK the repository into your own profile.
2. CLONE your personal repository to your local machine, not the MTCS repository.

## Pushing changes to vsherms repository:
1. git add -A in terminal/command line inside local repository directory.
2. git commit -m "PLEASE PROVIDE VALUABLE COMMENTS".
4. Create Pull Request to vsherms

## About this App
The app is made with a MERN stack - React on front end, Express, NodeJs, and MongoDB on the server side.

- Basic Sign Up and Log In Authentication gets you into the App. That is done using POST requests to the server. On srcServer, you can see how the requests are made, using Express to set up routes to MongoDB.
User schema is set up with Mongoose in the models folder.

- After authentication, the Home page loads, which makes the initial API GET request to /products.
The API call is done using an API Key: 136085, and username: miniproject, password: Pr!nt123. The API Key is hard coded. But other valid username and password combinations should work. When a new user registers, their credentials and name are saved in the app database.
The response is saved to the orderStore, and the Products component is invoked, which displays all of the products. Each product has a title, picture, and button to select for ordering.

- Once a product is selected, the getItemDetails method is called in order to call the API once again to retrieve the specific product details. These are displayed on the OrderDetails page. Not all of the items have a template, indicated by the "hasTemplate" field in the API response. If the item does have a template, a Template component is invoked, which renders fields for the user to fill out.

The field titles come from the "fieldname" key. And each field is saved in an array called fieldInfo on the OrderStore. There are also fields to put in user and shipping information. All of the shipping options are listed, along with a radio button. When a shipping option is selected, the price updates.

- Once the user fills in all of the fields, they push the Review Order button, which takes them to the ReviewOrder page, where all of their info is displayed. They can either Edit their input, or Submit the Order. The Submit Order button calls the API one last time at the /orders route, which makes a POST request with all of the order info needed.

- Finally, if all the fields were correctly filled out, the API responds with details about the order, including an order number, which is displayed on the OrderNumber page. If there was an error, for instance, if the email field was not filled out, an error will display.

## Areas for improvement.
- I used all of the clues I could from documentation to understand how the API is set up, and what information PFL is looking for. Some of the field names could be displayed better. I didn't know what all of them meant, so understanding more of what each product does and needs would help. It would be cool to further customize the different types of Template Fields, including being able to upload artwork or pictures, or choose from different assets that might exist on the PFL side.

- In the case of an order error, it would be cool to have a different message for the user based on which field might not be correct.

- The app saves the user and user credentials to the database. It could be cool to save order information there as well, and a way to view past orders, etc.

- Adding other features like order status updates, etc could be another good additional feature.
