#!/usr/bin/env python3
import json
import shutil
from html import escape
from pathlib import Path

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_RIGHT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle


ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "src" / "data" / "resume.json"
PRIMARY_PDF = ROOT / "public" / "nicholas-maassen-resume.pdf"
LEGACY_PDF = ROOT / "public" / "resume.pdf"


def link(url, label):
    return f'<a href="{escape(url)}" color="#111111">{escape(label)}</a>'


def para(text, style):
    return Paragraph(escape(text), style)


def section_title(text, style):
    return Paragraph(escape(text), style)


def main():
    resume = json.loads(DATA_PATH.read_text())
    PRIMARY_PDF.parent.mkdir(parents=True, exist_ok=True)

    styles = getSampleStyleSheet()
    styles.add(
        ParagraphStyle(
            name="Name",
            parent=styles["Normal"],
            fontName="Times-Bold",
            fontSize=16,
            leading=17,
            alignment=TA_CENTER,
            spaceAfter=2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Contact",
            parent=styles["Normal"],
            fontName="Times-Roman",
            fontSize=8.1,
            leading=9,
            alignment=TA_CENTER,
            spaceAfter=6,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Section",
            parent=styles["Normal"],
            fontName="Times-Bold",
            fontSize=8.8,
            leading=9.2,
            textTransform="uppercase",
            borderWidth=0.4,
            borderColor=colors.HexColor("#999999"),
            borderPadding=(0, 0, 1, 0),
            spaceBefore=3.5,
            spaceAfter=2.2,
        )
    )
    styles.add(
        ParagraphStyle(
            name="Body",
            parent=styles["Normal"],
            fontName="Times-Roman",
            fontSize=8.45,
            leading=9.15,
            spaceAfter=0,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BodyRight",
            parent=styles["Body"],
            alignment=TA_RIGHT,
        )
    )
    styles.add(
        ParagraphStyle(
            name="BoldLine",
            parent=styles["Body"],
            fontName="Times-Bold",
            leading=9,
            spaceBefore=1.8,
        )
    )
    styles.add(
        ParagraphStyle(
            name="ResumeBullet",
            parent=styles["Body"],
            leftIndent=8,
            firstLineIndent=-6,
            leading=8.95,
        )
    )

    doc = SimpleDocTemplate(
        str(PRIMARY_PDF),
        pagesize=letter,
        leftMargin=0.42 * inch,
        rightMargin=0.42 * inch,
        topMargin=0.36 * inch,
        bottomMargin=0.34 * inch,
    )

    story = []
    story.append(Paragraph(escape(resume["name"]), styles["Name"]))
    contact = " · ".join(
        [
          escape(resume["location"]),
          link(f'mailto:{resume["email"]}', resume["email"]),
          escape(resume["phone"]),
          link(f'https://{resume["website"]}', resume["website"]),
          link(f'https://{resume["github"]}', resume["github"]),
          link("https://www.linkedin.com/in/nmaass/", resume["linkedin"]),
        ]
    )
    story.append(Paragraph(contact, styles["Contact"]))

    story.append(section_title("Summary", styles["Section"]))
    story.append(para(resume["summary"], styles["Body"]))

    story.append(section_title("Skills", styles["Section"]))
    for group in resume["skills"]:
        text = f'<b>{escape(group["label"])}:</b> {escape(", ".join(group["items"]))}'
        story.append(Paragraph(text, styles["Body"]))

    story.append(section_title("Experience", styles["Section"]))
    for role in resume["experience"]:
        role_table = Table(
            [
                [
                    Paragraph(f'<b>{escape(role["company"])}</b><br/>{escape(role["location"])}', styles["Body"]),
                    Paragraph(f'{escape(role["title"])}<br/>{escape(role["dates"])}', styles["BodyRight"]),
                ]
            ],
            colWidths=[3.55 * inch, 3.55 * inch],
            hAlign="LEFT",
        )
        role_table.setStyle(
            TableStyle(
                [
                    ("LEFTPADDING", (0, 0), (-1, -1), 0),
                    ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                    ("TOPPADDING", (0, 0), (-1, -1), 0),
                    ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
                    ("VALIGN", (0, 0), (-1, -1), "TOP"),
                ]
            )
        )
        story.append(role_table)
        for group in role["groups"]:
            story.append(Paragraph(escape(group["heading"]), styles["BoldLine"]))
            for bullet in group["bullets"]:
                story.append(Paragraph(f"• {escape(bullet)}", styles["ResumeBullet"]))

    story.append(section_title("Earlier Experience", styles["Section"]))
    for role in resume["earlierExperience"]:
        text = (
            f'<b>{escape(role["company"])}</b> - {escape(role["title"])} '
            f'{escape(role["dates"])}<br/>{escape(role["description"])}'
        )
        story.append(Paragraph(text, styles["Body"]))

    story.append(section_title("Education", styles["Section"]))
    education = resume["education"]
    edu_table = Table(
        [
            [
                Paragraph(f'<b>{escape(education["school"])}</b><br/>{escape(education["degree"])}', styles["Body"]),
                Paragraph(f'{escape(education["location"])}<br/>{escape(education["date"])}', styles["BodyRight"]),
            ]
        ],
        colWidths=[3.55 * inch, 3.55 * inch],
        hAlign="LEFT",
    )
    edu_table.setStyle(
        TableStyle(
            [
                ("LEFTPADDING", (0, 0), (-1, -1), 0),
                ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                ("TOPPADDING", (0, 0), (-1, -1), 0),
                ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
                ("VALIGN", (0, 0), (-1, -1), "TOP"),
            ]
        )
    )
    story.append(edu_table)

    story.append(section_title("Projects", styles["Section"]))
    for project in resume["projects"]:
        text = (
            f'<b>{escape(project["name"])}</b> - {escape(project["stack"])} '
            f'{link(project["url"], project["url"])}<br/>{escape(project["description"])}'
        )
        story.append(Paragraph(text, styles["Body"]))

    story.append(Spacer(1, 0))
    doc.build(story)
    shutil.copyfile(PRIMARY_PDF, LEGACY_PDF)


if __name__ == "__main__":
    main()
