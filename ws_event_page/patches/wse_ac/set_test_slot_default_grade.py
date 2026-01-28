import frappe


def execute():
    """Set student_grade to G01 for existing test slots that have no grade."""
    frappe.db.sql(
        """UPDATE `tabWSE AC Test Slot`
        SET student_grade = 'G01'
        WHERE student_grade IS NULL OR student_grade = ''"""
    )
    frappe.db.commit()
