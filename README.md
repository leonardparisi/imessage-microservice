# Summary

This is a microservice that allows users to send iMessages via their own API.

# Usage

POST to `http://localhost:3000/send_text` with a body of the following format:

```ts
{
    phone_number: string, // the phone number to text
    message_options: string[], // a list of message options (one is picked at random)
    minute_variance = 0, // how much to randomly delay the text by
    date = new Date() // when to send the text in ISO format
}
```
