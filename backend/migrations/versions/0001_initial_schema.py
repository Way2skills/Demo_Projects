"""Create Decode Institution schema and verified course catalogue."""

from alembic import op
import sqlalchemy as sa

from app.database import Base
from app.models import entities  # noqa: F401

revision = "0001_initial"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    bind = op.get_bind()
    Base.metadata.create_all(bind=bind)

    category_table = sa.table(
        "course_categories",
        sa.column("name", sa.String),
        sa.column("slug", sa.String),
        sa.column("description", sa.Text),
        sa.column("ai_tools", sa.Text),
        sa.column("sort_order", sa.Integer),
        sa.column("is_active", sa.Boolean),
    )
    categories = [
        {"name": "Programming & Core Data", "slug": "programming-core-data", "description": "Programming languages, problem-solving and databases.", "ai_tools": "GitHub Copilot, Cursor, Claude", "sort_order": 1, "is_active": True},
        {"name": "Full Stack Development", "slug": "full-stack-development", "description": "Frontend, backend and full-stack web development.", "ai_tools": "Bolt.new, Builder.io, Uizard", "sort_order": 2, "is_active": True},
        {"name": "Data Analytics & AI", "slug": "data-analytics-ai", "description": "Analytics, visualization, AI and machine learning.", "ai_tools": "Deepnote, Orange, Claude, GPT, Excel AI Add-ins", "sort_order": 3, "is_active": True},
        {"name": "Creative, Business & Digital", "slug": "creative-business-digital", "description": "Design, business and digital skills.", "ai_tools": "Gemini, Stitch, Runway AI", "sort_order": 4, "is_active": True},
    ]
    op.bulk_insert(category_table, categories)
    category_ids = dict(bind.execute(sa.text("SELECT slug, id FROM course_categories")).all())

    course_table = sa.table(
        "courses",
        sa.column("category_id", sa.Integer),
        sa.column("name", sa.String),
        sa.column("slug", sa.String),
        sa.column("description", sa.Text),
        sa.column("syllabus", sa.Text),
        sa.column("duration_hours", sa.Integer),
        sa.column("fee", sa.Numeric),
        sa.column("image_url", sa.String),
        sa.column("is_active", sa.Boolean),
    )
    course_groups = {
        "programming-core-data": [
            "Python Programming", "Java Programming", "DSA using Java / Python", "C and C++",
            "Database Development", "C# and .NET", "Kotlin Programming",
        ],
        "full-stack-development": [
            "Java Full Stack", "Python Full Stack", "MERN Full Stack", "Backend Development",
            "React JS Development", "JavaScript Web Development", "Web Designing (HTML, CSS and JS)",
        ],
        "data-analytics-ai": [
            "Python with AI & ML", "Python Analytics", "Data Visualization (Power BI | Tableau)",
            "SQL Analytics", "Agentic AI", "Advanced Excel Analytics", "R Programming",
        ],
        "creative-business-digital": [
            "UI/UX Designing (Figma)", "Graphic Design", "Mobile App Development",
            "Video Editing", "Digital Marketing", "Aptitude Training", "Office Automation",
        ],
    }
    courses = []
    for category_slug, names in course_groups.items():
        for name in names:
            slug = "".join(char.lower() if char.isalnum() else "-" for char in name).strip("-")
            while "--" in slug:
                slug = slug.replace("--", "-")
            courses.append({
                "category_id": category_ids[category_slug],
                "name": name,
                "slug": slug,
                "description": None,
                "syllabus": None,
                "duration_hours": None,
                "fee": None,
                "image_url": None,
                "is_active": True,
            })
    op.bulk_insert(course_table, courses)

    kids_table = sa.table(
        "kids_courses",
        sa.column("name", sa.String),
        sa.column("description", sa.Text),
        sa.column("minimum_age", sa.Integer),
        sa.column("maximum_age", sa.Integer),
        sa.column("duration_hours", sa.Integer),
        sa.column("is_active", sa.Boolean),
    )
    op.bulk_insert(kids_table, [
        {"name": name, "description": None, "minimum_age": 7, "maximum_age": 14, "duration_hours": 30, "is_active": True}
        for name in ["Scratch Game Heroes", "AI Magic Lab", "Python Code Quest", "Game Maker Studio", "Web Creator Lab"]
    ])

    program_table = sa.table(
        "authorized_programs",
        sa.column("category", sa.String),
        sa.column("name", sa.String),
        sa.column("description", sa.Text),
        sa.column("duration_hours", sa.Integer),
        sa.column("syllabus", sa.Text),
        sa.column("is_active", sa.Boolean),
    )
    programs = [
        {"category": "TallyPrime", "name": name, "description": None, "duration_hours": None, "syllabus": None, "is_active": True}
        for name in [
            "Tally Essential Level 1", "Tally Essential Level 2", "Tally Essential Level 3",
            "GST Filing with TallyPrime", "Complete Tally Essential Comprehensive Certification",
        ]
    ]
    zoho_modules = [
        "Intro to Zoho Books", "Day-to-day Transactions", "Time-based Invoicing", "Advanced Operations",
        "Connected Banking", "Taxes & Compliance", "Reports & Analytics", "Customization",
        "Automation", "Integrations",
    ]
    programs.append({
        "category": "Zoho Books",
        "name": "Zoho Books",
        "description": None,
        "duration_hours": 36,
        "syllabus": "\n".join(f"{index}. {module}" for index, module in enumerate(zoho_modules, 1)),
        "is_active": True,
    })
    op.bulk_insert(program_table, programs)

    internship_table = sa.table(
        "internships",
        sa.column("title", sa.String),
        sa.column("description", sa.Text),
        sa.column("eligibility", sa.Text),
        sa.column("duration", sa.String),
        sa.column("skills", sa.Text),
        sa.column("is_active", sa.Boolean),
    )
    op.bulk_insert(internship_table, [{
        "title": "Free 1-Month Internship",
        "description": "Ask Decode Institution about current availability and eligible courses.",
        "eligibility": None,
        "duration": "1 Month",
        "skills": None,
        "is_active": True,
    }])

    settings_table = sa.table(
        "institution_settings",
        sa.column("institution_name", sa.String),
        sa.column("address", sa.Text),
        sa.column("phone", sa.String),
        sa.column("email", sa.String),
        sa.column("website", sa.String),
        sa.column("logo_url", sa.String),
        sa.column("about_content", sa.Text),
        sa.column("social_links", sa.Text),
    )
    op.bulk_insert(settings_table, [{
        "institution_name": "Decode Institution",
        "address": "4th Cut, Near New Bus Stand, Namakkal, Tamil Nadu, India.",
        "phone": "+91 6381243416",
        "email": None,
        "website": None,
        "logo_url": None,
        "about_content": "Built on values, driven by innovation.",
        "social_links": None,
    }])


def downgrade():
    Base.metadata.drop_all(bind=op.get_bind())
