import { Link } from "expo-router"
import React from "react"
import { Text } from "~/components/ui/text"
import Onboarding from "@/components/Onboarding"

const DATA = [
	{
		id: "1",
		title: "Numerous free trial \ncourses",
		subtitle: "Free courses for you to \ndiscover!",
		image: "https://picsum.photos/seed/picsum/500/500",
	},
	{
		id: "2",
		title: "Quick and easy learning",
		subtitle:
			"Accessible services provided \nin various ways, to accompany \nall your learning styles!",
		image: "https://picsum.photos/seed/picsum/500/500",
	},
	{
		id: "3",
		title: "Create your own \nstudy plan",
		subtitle:
			"Study at your own pace! \nMaking yourself consistent \nand motivated",
		image: "https://picsum.photos/seed/picsum/500/500",
	},
]

const Index = () => {
	return (
		<>
			<Onboarding data={DATA} />
		</>
	)
}

export default Index
