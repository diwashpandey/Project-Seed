import LoadingProfileCard from "../../ProfileCards/userProfileCards/LoadingProfileCard"
import ProfileCardStandard from "../../ProfileCards/userProfileCards/ProfileCardStandard"

export default function BaseProfilesContainer({usersData, isLoading, isSuccess}) {

    const getComponent = (usersData, isLoading, isSuccess)=>{
        if (isLoading){
            return <LoadingProfileCards />
        }
        if (isSuccess){
            if (! usersData){
                return <NoUsersAvailable />
            }
            let generatedCards = usersData?.map((user)=>{
                return <ProfileCardStandard key={user.id} user={user} />
            })
            return generatedCards
        }
    }

    const Component = getComponent(usersData, isLoading, isSuccess)

    return (
        <div id="downtown-followers-user-cards-container" className="grid flex-col place-items-center gap-6 sm:grid-cols-2">
            {Component}
        </div>
    )
}

function LoadingProfileCards(){
    return (
        <>
            <LoadingProfileCard />
            <LoadingProfileCard />
            <LoadingProfileCard />
            <LoadingProfileCard />
        </>
    )
}

function NoUsersAvailable(){
    return (
        <div className="h-53 w-full pl-4 text-2xl opacity-50"> No Users Found </div>
    )
}