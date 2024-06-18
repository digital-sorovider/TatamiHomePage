import { DashboardMenuItem, ResourceMenuItem, useResourceDefinitions, Menu } from "react-admin";

export const CustomMenu = (props) => {
    const resources = useResourceDefinitions();

    return (
        <>
            <DashboardMenuItem key="default-dashboard-menu-item" />
            { Object.keys(resources)
                .map(name => {
                    const { options, ...resource } = resources[name]
                    if (resource.hasList) {
                        return <ResourceMenuItem key={name} name={name} />
                    }
                    else {
                        return (
                            <Menu.Item 
                                key={name} 
                                to={options.to}
                                primaryText={options.label} 
                                leftIcon={<resource.icon />} 
                            />
                        )
                    }
                })
            }
        </>
    )
}
