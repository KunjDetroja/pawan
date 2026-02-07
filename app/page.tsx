import {
  ProfileHeader,
  SaveContactCard,
  ActionCard,
  PhoneIcon,
  WhatsAppIcon,
  EmailIcon,
  FacebookIcon,
  LocationCard,
  ServicesCard,
  BankDetailsCard,
  SocialLinks,
  LinkedInIcon,
  InstagramIcon,
  TwitterIcon,
  YouTubeIcon,
  FloatingDock,
} from "@/components";

// Social links configuration
const socialLinks = [
  {
    name: "LinkedIn",
    href: "#",
    icon: <LinkedInIcon />,
    hoverColor: "group-hover:bg-blue-600 group-hover:text-white",
    hoverBorder: "group-hover:border-blue-500",
  },
  {
    name: "Insta",
    href: "#",
    icon: <InstagramIcon />,
    hoverColor: "group-hover:bg-pink-600 group-hover:text-white",
    hoverBorder: "group-hover:border-pink-500",
  },
  {
    name: "Twitter",
    href: "#",
    icon: <TwitterIcon />,
    hoverColor: "group-hover:bg-blue-500 group-hover:text-white",
    hoverBorder: "group-hover:border-blue-400",
  },
  {
    name: "YouTube",
    href: "#",
    icon: <YouTubeIcon />,
    hoverColor: "group-hover:bg-red-600 group-hover:text-white",
    hoverBorder: "group-hover:border-red-500",
  },
];

// Bank details configuration
const bankDetails = {
  bankName: "Bank of India",
  accountName: "SATYAM ENTERPRISES",
  accountNumber: "312120110000870",
  branch: "Rajkot",
  ifscCode: "BKID0003121",
};

export default function Home() {
  return (
    <>
      {/* Profile Header */}
      <ProfileHeader
        title="Satyam Enterprise"
        name="Sanjay Patel"
        role="Owner"
        description="Distributor of Oil Level Indicator & Industrial Machinery Solutions."
        imageUrl="/Pawan.png"
      />

      {/* Main Content: Bento Grid */}
      <main className="mx-auto w-full max-w-md space-y-3 px-4">

        {/* 2 Column Grid for Primary Actions */}
        <div className="grid grid-cols-2 gap-3">
          <ActionCard
            href="tel:+919428010011"
            customIcon={<PhoneIcon />}
            label="Mobile"
            value="+91 94280 10011"
            colorScheme="green"
          />
          <ActionCard
            href="https://wa.me/919723600001"
            customIcon={<WhatsAppIcon />}
            label="WhatsApp"
            value="Chat Now"
            colorScheme="teal"
          />
          <ActionCard
            href="mailto:satyamenterpris02@gmail.com"
            customIcon={<EmailIcon />}
            label="Email"
            value="Send Mail"
            colorScheme="orange"
          />
          <ActionCard
            href="https://www.facebook.com/share/184pcxwKqr/"
            customIcon={<FacebookIcon />}
            label="Facebook"
            value="Follow Us"
            colorScheme="blue"
          />
        </div>

        {/* Services Card */}
        <ServicesCard
          title="Our Services"
          description="Industrial machinery & hardware solutions."
        />

        {/* Bank Details Card */}
        <BankDetailsCard bankDetails={bankDetails} />

        {/* Save Contact Card */}
        <SaveContactCard />

        {/* Location Card */}
        <LocationCard
          address="FF-60, Samruddhi Bhavan, 3rd Floor"
          city="Opp. Bombay Petrol Pump, Gondal Road, Rajkot - 360002"
          embedUrl="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3691.859723318689!2d70.79667707533606!3d22.28330297969886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3959ca126519b81f%3A0xd513a203a82dec4b!2sSamrudhi%20Bhawan!5e0!3m2!1sen!2sin!4v1770473441475!5m2!1sen!2sin"
          latitude={22.283303}
          longitude={70.799252}
        />

        {/* Social Media Links */}
        <SocialLinks links={socialLinks} />
      </main>

      {/* Floating Dock */}
      <FloatingDock />
    </>
  );
}
