export  default function Footer (){

    const date = new Date();
    const year = date.getFullYear();

    return (
        <footer className="py-1">
            <p className="text-center text-dark mt-1">
                Ecom Shop - {year}, All Rights Reserved
            </p>
        </footer>
    )
};