'use clientq'

import FmField from "@/app/components/ui/fmfield/fmfield";
import { useRouter } from "next/router";



export default function Page({ params }: { params: { matchId: string } }) {

    

    return (
        <FmField matchId={params.matchId}></FmField>
    )

}