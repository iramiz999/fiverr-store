import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js'
import React from 'react'

const paypalpayment = ({totalPrice}) => {

  const style = { layout: "vertical" };



  <PayPalButtons
  style={style}
  disabled={false}
  forceReRender={[style]}
  fundingSource={undefined}
  createOrder={(data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  }}
 
/>

  return (
    
      
      <div>
      <PayPalScriptProvider
        options={{
          "clientId": process.env.NEXT_PUBLIC_PAYPAL_CLIENTID,
          components: "buttons",
          currency: "ILS",
          
        }}
      >
        <PayPalButtons />
      </PayPalScriptProvider>
    </div>
    
  )
}

export default paypalpayment
