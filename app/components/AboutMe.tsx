export default function AboutMe() {
  return (
    <section className="relative z-10 bg-white px-8 py-24 md:px-16 lg:px-24">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <h2 className="text-4xl md:text-7xl lg:text-8xl font-semibold mb-16">
          Σχετικά με εμένα
        </h2>

        {/* Intro */}
        <div className="grid gap-12 md:grid-cols-2 mb-24">
          <div>
            <p className="text-lg md:text-xl leading-relaxed text-zinc-700">
              Είμαι η Πέπη Ρογδάκη, χειρουργός οδοντίατρος με πάθος για την
              αισθητική οδοντιατρική και την ολιστική φροντίδα του χαμόγελου.
              Αποφοίτησα από την Οδοντιατρική Σχολή του Εθνικού και Καποδιστριακού
              Πανεπιστημίου Αθηνών και συνεχίζω να εκπαιδεύομαι σε σύγχρονες
              τεχνικές και τεχνολογίες.
            </p>
          </div>
          <div>
            <p className="text-lg md:text-xl leading-relaxed text-zinc-700">
              Στο ιατρείο μου θα βρείτε έναν χώρο σχεδιασμένο να σας κάνει να
              νιώθετε άνετα. Πιστεύω ότι η επίσκεψη στον οδοντίατρο δεν πρέπει
              να είναι αγχωτική — αλλά μια εμπειρία φροντίδας, εμπιστοσύνης και
              σεβασμού.
            </p>
          </div>
        </div>

        {/* Philosophy */}
        <div className="mb-24">
          <h3 className="text-2xl md:text-4xl font-semibold mb-8">Η φιλοσοφία μου</h3>
          <p className="text-lg md:text-xl leading-relaxed text-zinc-700 max-w-2xl">
            Κάθε ασθενής είναι μοναδικός. Δεν πιστεύω στις τυποποιημένες λύσεις.
            Αφιερώνω χρόνο για να ακούσω τις ανάγκες σας, να σχεδιάσω ένα
            εξατομικευμένο πλάνο θεραπείας και να σας συνοδεύσω σε κάθε βήμα
            προς ένα υγιές, όμορφο χαμόγελο.
          </p>
        </div>


        {/* Contact / CTA */}
        <div>

          <a
            href="#book"
            className="inline-block rounded-full bg-black text-white px-8 py-4 text-base md:text-lg font-medium transition-opacity hover:opacity-80"
          >
            Κλείσε ραντεβού
          </a>
        </div>
      </div>
    </section>
  );
}
