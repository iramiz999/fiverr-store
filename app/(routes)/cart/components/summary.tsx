"use client";

import axios from "axios";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Button from "@/components/ui/button";
import Currency from "@/components/ui/currency";
import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import Paypalpayment from "@/components/paypalpayment";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";




const Summary = () => {


  const paypalpayment = () => {

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
            "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENTID,
            components: "buttons",
            currency: "ILS",
            
          }}
        >
          <PayPalButtons />
        </PayPalScriptProvider>
      </div>
      
    )
  }



  

  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get('success')) {
      toast.success('Payment completed.');
      removeAll();
    }

    if (searchParams.get('canceled')) {
      toast.error('Something went wrong.');
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    return total + Number(item.price)
  }, 0);

  const onCheckout = async () => {
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/checkout`, {
      productIds: items.map((item) => item.id)
    });

    window.location = response.data.url;
  }
  const handlePaymentSuccess = (details: any) => {
    console.log('Payment successful:', details);
  };

  return ( 
    <>
    
    <div
      className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
    >
      <h2 className="text-lg font-medium text-gray-900">
        Order summary
      </h2>
      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between border-t border-gray-200 pt-4">
          <div className="text-base font-medium text-gray-900">Order total</div>
         <Currency value={totalPrice} />
        </div>
      </div>

      {/* <Button onClick={onCheckout} disabled={items.length === 0} className="w-full mt-6">
        Checkout
      </Button> */}



      
      {/* <PayPalButtons className="p-3 m-3" /> */}

<Paypalpayment totalPrice={totalPrice }  />






      
    </div>

    </>

  );
}
 
export default Summary;
