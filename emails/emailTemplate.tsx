import { Section, Img, Text, Heading, Button } from "@react-email/components";

import BubbleGif from '../resources/emailBanner.gif'

interface VerificationEmailProps {
  email: string,
  username:string,
  otp: string;

}

export default function EmailTemplate({
  email,username,otp
}:VerificationEmailProps) {
  return <>

    <Section className="my-[16px]">
      <Img
        alt="Braun Collection"
        className="w-full rounded-[12px] object-cover"
        height={320}
        src="https://i.imgur.com/222iK9F.gif"
      />
      <Section className="mt-[32px] text-center">
        <Text className="mt-[16px] text-[18px] font-semibold leading-[28px] text-indigo-600">
          Bubbler Login One Time Password 
        </Text>
        <Heading
          as="h1"
          className="text-[36px] font-semibold leading-[40px] tracking-[0.4px] text-gray-900"
        >
         Email {email} & Username  {username}
        </Heading>
        <Text className="mt-[8px] text-[16px] leading-[24px] text-gray-900">
          Please don't share this otp with anyone, keep you otp secured
        </Text>
        <Heading
          as="h1"
          className="text-[50px] font-semibold leading-[40px] tracking-[0.4px] text-black"
        >
         {otp}
        </Heading>
        
      </Section>
    </Section>
  </>
}