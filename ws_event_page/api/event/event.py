import frappe


@frappe.whitelist(allow_guest=True)
def get_event_page_data(site_url):
    try:
        event = frappe.get_doc("WSE Event", site_url).as_dict()

        # transform list of variables to dictionary
        new_variables = {}
        for variable in event["variables"]:
            new_variables[variable["variable_name"]] = {
                "id": variable["name"],
                "type": variable["variable_type"],
                "value": (
                    variable["variable_value"]
                    if variable["variable_type"] == "Text"
                    else variable["image"]
                ),
            }
        event["variables"] = new_variables

        return event
    except frappe.DoesNotExistError:
        frappe.throw("Event not found")
