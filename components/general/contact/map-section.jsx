'use client';

export default function MapSection() {
  return (
    <section className="h-[910px] bg-[#8E92BC] rounded-t-[40px] -mt-10 py-[150px] px-[40px]">
      <div className="w-full h-full rounded-[40px] overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2441.355582176311!2d5.971374415799114!3d51.62583941016902!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c6e2c7bcbf8793%3A0x8048a63f31379a2f!2sDe%20Advocaten%20van%20Van%20Riet%20B.V.!5e0!3m2!1sen!2snl!4v1717454183642!5m2!1sen!2snl"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[610px]"
        ></iframe>
      </div>
    </section>
  );
}
