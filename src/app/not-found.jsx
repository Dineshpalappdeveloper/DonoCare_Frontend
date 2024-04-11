import { Button } from '@mui/material';
import Link from 'next/link';
import React from 'react'

export const metadata = {
    title: "DonoCare | We are here to care you ",
    description: "DonoCare services",
};

function page() {
    return (
        <div>Welcome to DonoCare
            <p>Page Not Found </p>
            <br />
            <Button variant='contained' color='primary'>
                <Link href="/" style={{ color: "black" }} >
                    Go to Home
                </Link>
            </Button>
        </div>
    )
}

export default page